import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs } from "variables/general.js";

import {
  dailySalesChart,
  completedTasksChart
} from "variables/charts.js";
import * as actions from "store/actions/actionIndexes";
import { user_instance as axios } from '../../apiCaller';
import { connect } from "react-redux";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);


const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enqueueSnackbar: (notification) => dispatch(actions.enqueueSnackbar(notification)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Dashboard(props) {




  const getStudentAllExamOnChain = async () => {
    const studentOnChainData = await axios.post(`/user/${props.currentUser.user_id}/examsOnChain`, {
      cert: props.currentUser.cert,
      priv_key: props.currentUser.priv_key,
      pwd: "foobarpassword"
    });

    console.log(studentOnChainData);
  }


  

  const classes = useStyles();
  return (
    <div>
      {/* <Button onClick={getStudentAllExamOnChain}>CCCCBtn</Button> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Assigned Excercises", // show list cac ki thi assigned but chua lam and it's status
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            headerColor="success"
            tabs={[
              {
                tabName: "Exercises result on Chain stats", // show list cac ki thi assigned but chua lam and it's status
                tabIcon: BugReport,
                tabContent: (
                  <Table
                    tableHeaderColor="success"
                    tableHead={["ID", "Name", "Classroom", "Mark"]}
                    tableData={[
                      ["1", "Math", "15TCLC2", "99/180"],
                      ["2", "Physics", "15TCLC2", "123/180"],
                      ["3", "Codeer", "15TCLC2", "136/180"],
                      ["4", "Chaney", "15TCLC2", "50/180"]
                    ]}
                  />
                )
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Recently Result</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
)