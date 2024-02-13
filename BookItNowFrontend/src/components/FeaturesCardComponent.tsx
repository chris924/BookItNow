import { CardHeader, Divider, CardBody, CardFooter, Link, Image, Card } from "@nextui-org/react";


interface FeaturesCardComponentProps{

  cardTitle: string;
  cardBody: string;
  src: string;

}


export default function CardComponent({cardTitle, cardBody, src}: FeaturesCardComponentProps) : JSX.Element 
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
      </Card>
      </div>
    )
}