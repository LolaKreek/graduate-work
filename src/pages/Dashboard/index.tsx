import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  selectNotificationStatus,
} from "../../store/Slices/notification";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import { Box } from "@mui/material";
import TopUsers from "../../features/dashboard/TopUsers";
import ProStatistics from "../../features/dashboard/Professor/Statistics";
import StudStatistics from "../../features/dashboard/Student/Statistics";
import StudActivity from "../../features/dashboard/Student/Activity";
import ProActivity from "../../features/dashboard/Professor/Activity";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const roleBasedElements: {[key: string]: {"student": JSX.Element, "professor": JSX.Element}} = {
    statistics: {
      "student": <StudStatistics />,
      "professor": <ProStatistics />
    },
    activity: {
      "student": <StudActivity />,
      "professor": <ProActivity/>,
    }
  }

  const notificationState = useSelector((state: RootState) =>
    selectNotificationStatus(state)
  );
  const notificationHeader = useSelector(
    (state: RootState) => state.notification.header
  );
  const notificationMessage = useSelector(
    (state: RootState) => state.notification.message
  );
  const notificationType = useSelector(
    (state: RootState) => state.notification.type
  );

  const [notification, setNotification] = useState(notificationState);

  const checkNotifications = () => {
    if (notification) {
      setNotification(false);
      dispatch(deleteNotification());
      toast.custom(
        (element) => (
          <Notification
            header={notificationHeader}
            message={notificationMessage}
            element={element}
            type={notificationType}
          />
        ),
        { position: "bottom-center" }
      );
    }
  };

  useEffect(() => {
    checkNotifications();
  }, [notification]);

  return (
    <Box className="dashboard__root">
      <Box className="dashboard__container">
        <TopUsers />
        {/* @ts-ignore */}
        {roleBasedElements.statistics[user.role]}
      </Box>
      {/* @ts-ignore */}
      {roleBasedElements.activity[user.role]}
    </Box>
  );
};

export default DashboardPage;
