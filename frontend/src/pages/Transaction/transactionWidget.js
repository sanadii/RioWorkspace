<Row>
{transactionWidgets.map((transactionwidget, key) => (
  <React.Fragment key={key}>
    <Col xl={3} md={6}>
      <Card className="card-animate">
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className="text-uppercase fw-medium text-muted mb-0">
                {transactionwidget.label}
              </p>
            </div>
            <div className="flex-shrink-0">
              <h5
                className={
                  "fs-14 mb-0 text-" +
                  transactionwidget.percentageClass
                }
              >
                <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                {transactionwidget.percentage}
              </h5>
            </div>
          </div>
          <div className="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                <CountUp
                  start={0}
                  prefix={transactionwidget.prefix}
                  suffix={transactionwidget.suffix}
                  end={transactionwidget.counter}
                  duration={4}
                  className="counter-value"
                />
              </h4>
              <span className="badge bg-warning me-1">
                {transactionwidget.badge}
              </span>{" "}
              <span className="text-muted">
                {" "}
                {transactionwidget.caption}
              </span>
            </div>
            <div className="avatar-sm flex-shrink-0">
              <span className="avatar-title bg-light rounded fs-3">
                <FeatherIcon
                  icon={transactionwidget.feaIcon}
                  className="text-success icon-dual-success"
                />
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  </React.Fragment>
))}
</Row>