import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function BentoGridDemo() {
  return (
    <BentoGrid>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          header={item.header}
          icon={item.icon}
          title={item.title}
          description={item.description}
          className={i == 1 || i == 2 || i == 5 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    header: "header",
    icon: "icon",
    title: "title",
    description: "description",
  },
  {
    header: "header",
    icon: "icon",
    title: "title",
    description: "description",
  },
  {
    header: "header",
    icon: "icon",
    title: "title",
    description: "description",
  },
  {
    header: "header",
    icon: "icon",
    title: "title",
    description: "description",
  },
  {
    header: "header",
    icon: "icon",
    title: "title",
    description: "description",
  },
  {
    header: "header",
    icon: "icon",
    title: "title",
    description: "description",
  },
];
