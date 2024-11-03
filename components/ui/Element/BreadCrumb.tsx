import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadCrumbItem {
    name: string;
    link?: string;
}

interface BreadCrumbProps {
    items: BreadCrumbItem[];
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items?.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.link ? (
                            <BreadcrumbLink href={item.link} className="cursor-pointer">
                                {item.name}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage className="text-primary font-medium">
                                {item.name}
                            </BreadcrumbPage>
                        )}
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
