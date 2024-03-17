# Appointments

STATUS_CHOICES = [
    (1, 'pencilled-in', "fc-pending"),
    (2, 'not-started', "fc-ns"),
    (3, 'arrived', "fc-arrived"),
    (4, 'started', "fc-arrived"),
    (5, 'completed', "fc-completed"),
    (6, 'did-not-show', "fc-dns"),
    (7, 'cancelled', "fc-cancelled"),
]
STATUS_CLASS_MAP = {status[0]: status[2] for status in STATUS_CHOICES}


STATUS_CHOICES = [
    (1, 'pencilled-in'),
    (2, 'not-started'),
    (3, 'arrived'),
    (4, 'started'),
    (5, 'completed'),
    (6, 'did-not-show'),
    (7, 'cancelled'),
]
