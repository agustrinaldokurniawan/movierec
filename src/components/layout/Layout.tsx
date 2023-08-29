import { IChildren } from "@/common/interfaces/ichildren";
import SideMenu from "../SideMenu/SideMenu";

export default function Layout(props: IChildren) {
  return <>{props.children}</>;
}
