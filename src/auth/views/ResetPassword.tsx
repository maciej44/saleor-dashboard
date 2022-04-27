import { APP_MOUNT_URL } from "@saleor/config";
import { useRequestPasswordResetMutation } from "@saleor/graphql";
import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import { extractMutationErrors } from "@saleor/misc";
import React from "react";
import { useIntl } from "react-intl";
import urlJoin from "url-join";

import ResetPasswordPage, {
  ResetPasswordPageFormData
} from "../components/ResetPasswordPage";
import { newPasswordUrl, passwordResetSuccessUrl } from "../urls";

const ResetPasswordView: React.FC = () => {
  const [error, setError] = React.useState<string>();
  const navigate = useNavigator();
  const intl = useIntl();

  const [
    requestPasswordReset,
    requestPasswordResetOpts
  ] = useRequestPasswordResetMutation({
    onCompleted: data => {
      if (data.requestPasswordReset.errors.length === 0) {
        navigate(passwordResetSuccessUrl);
      } else {
        if (
          data.requestPasswordReset.errors.find(err => err.field === "email")
        ) {
          setError(
            intl.formatMessage({
              defaultMessage:
                "Provided email address does not exist in our database."
            })
          );
        } else {
          setError(intl.formatMessage(commonMessages.somethingWentWrong));
        }
      }
    }
  });

  const handleSubmit = (data: ResetPasswordPageFormData) =>
    extractMutationErrors(
      requestPasswordReset({
        variables: {
          email: data.email,
          redirectUrl: urlJoin(
            window.location.origin,
            APP_MOUNT_URL === "/" ? "" : APP_MOUNT_URL,
            newPasswordUrl().replace(/\?/, "")
          )
        }
      })
    );

  return (
    <ResetPasswordPage
      disabled={requestPasswordResetOpts.loading}
      error={error}
      onBack={() => navigate(APP_MOUNT_URL)}
      onSubmit={handleSubmit}
    />
  );
};
ResetPasswordView.displayName = "ResetPasswordView";
export default ResetPasswordView;
