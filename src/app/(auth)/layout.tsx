import { PropsWithChildren } from "react";

const layout = (props: PropsWithChildren) => {
  return <div className="flex justify-center pt-16">{props.children}</div>;
}

export default layout;