import { CreateButton } from "@/components/refine-ui/buttons/create";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";

function ClassesList() {
  return (
    <ListView>
      <Breadcrumb />
      <CreateButton />
    </ListView>
  );
}

export default ClassesList;
