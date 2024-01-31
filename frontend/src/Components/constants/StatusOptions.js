const StatusOptions = [
  {
    id: 1,
    name: "New",
    value: "new",
    badgeClass: "badge bg-info",
  },
  {
    id: 2,
    name: "Private",
    value: "private",
    badgeClass: "badge bg-primary",
  },
  {
    id: 3,
    name: "Public",
    value: "public",
    badgeClass: "badge bg-success",
  },
  {
    id: 4,
    name: "Deleted",
    value: "deleted",
    badgeClass: "badge bg-dark",
  },
];


const StatusBadge = ({ status }) => {
  const entryStatus = StatusOptions.find(option => option.id === status);
  if (!entryStatus) return null;

  return (
    <div className={`badge rounded-pill ${entryStatus.badgeClass} fs-12`}>
      {entryStatus.name}
    </div>
  );
};
