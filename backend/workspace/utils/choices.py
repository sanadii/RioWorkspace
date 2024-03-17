# Appointments

STATUS_CHOICES = [
    (1, 'pencilled-in'),
    (2, 'not-started'),
    (3, 'arrived'),
    (4, 'started'),
    (5, 'completed'),
    (6, 'did-not-show'),
    (7, 'cancelled'),
]

STATUS_CLASS_MAP = {
    1: "fc-pending",
    2: "fc-ns",
    3: "fc-arrived",
    4: "fc-arrived",
    5: "fc-completed",
    6: "fc-dns",
    7: "fc-cancelled",
}
