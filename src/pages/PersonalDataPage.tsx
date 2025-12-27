import { PageWrapper } from "@/components/layout/PageWrapper";
import { PersonalDataForm } from "@/components/features/PersonalDataForm";

export const PersonalDataPage = () => {
  return (
    <PageWrapper title="Dados Pessoais">
      <div className="p-4">
        <PersonalDataForm />
      </div>
    </PageWrapper>
  );
};
