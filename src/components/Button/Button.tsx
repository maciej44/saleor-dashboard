import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Button as MacawButton, ButtonTypeMap } from "@saleor/macaw-ui";
import { isExternalURL } from "@saleor/utils/urls";
import React from "react";
import { Link } from "react-router-dom";

const Button: React.FC<any> = React.forwardRef(({ href, ...props }) => {
  if (href && !isExternalURL(href)) {
    return <MacawButton {...props} to={href} component={Link} />;
  }

  return <MacawButton href={href} {...props} />;
});
Button.displayName = "Button";

export default Button as OverridableComponent<ButtonTypeMap>;