import { Backlink } from "@saleor/components/Backlink";
import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import LanguageSwitch from "@saleor/components/LanguageSwitch";
import PageHeader from "@saleor/components/PageHeader";
import { CategoryTranslationFragment, LanguageCodeEnum } from "@saleor/graphql";
import { commonMessages, sectionNames } from "@saleor/intl";
import { getStringOrPlaceholder } from "@saleor/misc";
import {
  TranslationInputFieldName,
  TranslationsEntitiesPageProps
} from "@saleor/translations/types";
import {
  languageEntitiesUrl,
  TranslatableEntities
} from "@saleor/translations/urls";
import React from "react";
import { useIntl } from "react-intl";

import TranslationFields from "../TranslationFields";

export interface TranslationsCategoriesPageProps
  extends TranslationsEntitiesPageProps {
  data: CategoryTranslationFragment;
}

const TranslationsCategoriesPage: React.FC<TranslationsCategoriesPageProps> = ({
  activeField,
  disabled,
  languageCode,
  languages,
  data,
  saveButtonState,
  onDiscard,
  onEdit,
  onLanguageChange,
  onSubmit
}) => {
  const intl = useIntl();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.categories
        })}
      >
        {intl.formatMessage(sectionNames.translations)}
      </Backlink>
      <PageHeader
        title={intl.formatMessage(
          {
            defaultMessage:
              'Translation Category "{categoryName}" - {languageCode}'
          },
          {
            categoryName: getStringOrPlaceholder(data?.category?.name),
            languageCode
          }
        )}
      >
        <LanguageSwitch
          currentLanguage={LanguageCodeEnum[languageCode]}
          languages={languages}
          onLanguageChange={onLanguageChange}
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage(commonMessages.generalInformations)}
        fields={[
          {
            displayName: intl.formatMessage({
              defaultMessage: "Category Name"
            }),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: "short" as "short",
            value: data?.category?.name
          },
          {
            displayName: intl.formatMessage(commonMessages.description),
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: "rich" as "rich",
            value: data?.category?.description
          }
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage({
          defaultMessage: "Search Engine Preview"
        })}
        fields={[
          {
            displayName: intl.formatMessage({
              defaultMessage: "Search Engine Title"
            }),
            name: TranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: "short" as "short",
            value: data?.category?.seoTitle
          },
          {
            displayName: intl.formatMessage({
              defaultMessage: "Search Engine Description"
            }),
            name: TranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: "long" as "long",
            value: data?.category?.seoDescription
          }
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
    </Container>
  );
};
TranslationsCategoriesPage.displayName = "TranslationsCategoriesPage";
export default TranslationsCategoriesPage;
