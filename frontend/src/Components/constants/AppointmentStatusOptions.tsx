// StatusOptions.tsx

export const AppointmentStatusOptions = [
  { 
    id: 1, 
    name: "Pencilled In", 
    value: "pencilled-in", 
    badgeClass: "badge bg-info", 
    className: "fc-pending fc-comment fc-event-inner fc-light-pink",
    color: "#1abc9c" // Example color
  },
  { 
    id: 2, 
    name: "Not started", 
    value: "not-started", 
    badgeClass: "badge bg-primary", 
    className: "fc-pending fc-event-inner fc-light-yellow",
    color: "#3498db" // Example color
  },
  { 
    id: 3, 
    name: "Arrived", 
    value: "arrived", 
    badgeClass: "badge bg-success", 
    className: "fc-pending fc-event-inner fc-light-blue",
    color: "#2ecc71" // Example color
  },
  { 
    id: 4, 
    name: "Started", 
    value: "started", 
    badgeClass: "badge bg-warning", 
    className: "fc-event-start fc-event-end fc-event-inner fc-light-green",
    color: "#f1c40f" // Example color
  },


// fc-booking-id-384534513
// fc-group-306316406
  { 
    id: 5, 
    name: "Completed", 
    value: "completed", 
    badgeClass: "badge bg-secondary", 
    className: "fc-booking fc-completed fc-paid",
    color: "#1BBC9D" // Example color
  },
  { 
    id: 6, 
    name: "Did not show", 
    value: "did-not-show", 
    badgeClass: "badge bg-danger", 
    className: "fc-pending fc-event-inner fc-group-highlight",
    color: "#e74c3c" // Example color
  },
];
