from django.contrib.auth.models import User
from django.utils import timezone
from django.db import transaction, models
from decimal import Decimal

# Create your models here.
class Profile(models.Model):
    cash = models.DecimalField(default=100.00, max_digits=12, decimal_places=2)
    level = models.IntegerField(default=1)
    counter = models.PositiveBigIntegerField(default=0)
    rebirth = models.IntegerField(default=0)
    last_updated = models.DateTimeField(default=timezone.now)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    # Ensure that cash never goes lower than 0
    def save(self, *args, **kwargs):
        if self.cash < 0:
            self.cash = 0
        super().save(*args, **kwargs)

    def get_current_details(self):
        now = timezone.now()
        with transaction.atomic():
            elapsed = (now - self.last_updated).total_seconds()
            increment = int(elapsed * self.level)
            if increment > 0:
                self.cash += increment / Decimal("2")
                self.counter += increment
                self.last_updated = now
                self.save(update_fields=['cash', 'counter', 'last_updated'])
        return self.cash, self.counter
            
    def __str__(self):
        return f"{self.user} has ${self.cash}"
