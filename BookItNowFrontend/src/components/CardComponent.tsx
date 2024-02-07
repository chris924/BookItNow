import { CardHeader, Divider, CardBody, CardFooter, Link, Image, Card } from "@nextui-org/react";


interface CardComponentProps{

  cardTitle: string;
  cardBody: string;
  cardFooter: string;
  href: string;

}


export default function CardComponent({cardTitle, cardBody, cardFooter, href}: CardComponentProps) : JSX.Element 
{

    return(
        <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{cardTitle}</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <p>{cardBody}</p>
        </CardBody>
        <Divider/>
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href={href}
          >
            {cardFooter}
          </Link>
        </CardFooter>
      </Card>
    )
}