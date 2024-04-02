const SummarySaleExtras = () => {
  return (
    <div className="sale__summary-extras">
      <button className="sale__button-link sale__button-link--underlined">
        <div className="icon-module_xlarge__2Al4n icon-module_streamline__13d-J">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 11.823v3.432c0 .436.173.854.482 1.163l6.34 6.342a.823.823 0 001.164 0l3.773-3.774a.823.823 0 000-1.163l-6.341-6.341A1.646 1.646 0 0014.255 11h-3.432a.823.823 0 00-.823.823zm2.88 2.88a.823.823 0 100-1.646.823.823 0 000 1.645z"
              stroke="#63727B"
              stroke-width="1.5"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>{" "}
        Sale options
      </button>
    </div>
  );
};

export default SummarySaleExtras;
