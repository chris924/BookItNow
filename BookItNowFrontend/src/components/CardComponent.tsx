import { CardHeader, Divider, CardBody, CardFooter, Link, Image, Card } from "@nextui-org/react";


interface CardComponentProps{

  cardTitle: string;
  cardBody: string;
  cardFooter: string;
  href: string;
  src: string;

}


export default function CardComponent({cardTitle, cardBody, cardFooter, href, src}: CardComponentProps) : JSX.Element 
{

    return(
      <div className="py-5">
        <Card className="max-w-[450px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={60}
            radius="lg"
            src={src}
            width={60}
          />
          <div className="flex flex-col">
            <p className="text-lg">{cardTitle}</p>
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
      </div>
    )
}