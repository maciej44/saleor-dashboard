import { Typography } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import yellow from "@material-ui/core/colors/yellow";
import { makeStyles } from "@saleor/macaw-ui";
import Label from "@saleor/orders/components/OrderHistory/Label";
import classNames from "classnames";
import React from "react";

import { StatusType } from "../StatusChip/types";

export const useStyles = makeStyles(
  theme => {
    const dot = {
      borderRadius: "100%",
      height: 8,
      minHeight: 8,
      width: 8,
      minWidth: 8
    };

    return {
      dot,
      container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      },
      containerVertical: {
        alignItems: "flex-start"
      },
      textContainer: {
        marginLeft: theme.spacing(1),
        display: "flex",
        flexDirection: "column"
      },
      dotVertical: {
        marginTop: theme.spacing(1)
      },
      alertDot: {
        backgroundColor: yellow[500],
        ...dot
      },
      errorDot: {
        backgroundColor: theme.palette.error.main,
        ...dot
      },
      neutralDot: {
        backgroundColor: grey[300],
        ...dot
      },
      successDot: {
        backgroundColor: theme.palette.primary.main,
        ...dot
      },
      span: {
        display: "inline"
      }
    };
  },
  { name: "StatusLabel" }
);

export interface StatusLabelProps {
  label: string | React.ReactNode;
  status: StatusType;
  subtitle?: string;
  className?: string;
}

const StatusLabel: React.FC<StatusLabelProps> = ({
  className,
  label,
  status,
  subtitle
}) => {
  const classes = useStyles({});
  return (
    <div
      className={classNames({
        [classes.container]: true,
        [classes.containerVertical]: !!subtitle
      })}
    >
      <div
        className={classNames({
          [className]: !!className,
          [classes.dotVertical]: !!subtitle,
          [classes.successDot]: status === StatusType.SUCCESS,
          [classes.alertDot]: status === StatusType.ALERT,
          [classes.neutralDot]: status === StatusType.NEUTRAL || !status,
          [classes.errorDot]: status === StatusType.ERROR
        })}
      ></div>
      <div className={classes.textContainer}>
        <Typography>{label}</Typography>
        {subtitle && <Label text={subtitle} />}
      </div>
    </div>
  );
};

export default StatusLabel;
