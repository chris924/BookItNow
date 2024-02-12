import { CardHeader, Divider, CardBody, CardFooter, Link, Image, Card, Button, Avatar } from "@nextui-org/react";


interface UserCardComponentProps{

  cardName: string;
  cardUsername: string;
  cardFollowers: number;
  cardFollowing: number;
  href: string;
  src: string;

}


export default function UserCardComponent({cardName, cardUsername, cardFollowers, cardFollowing, href, src}: UserCardComponentProps) : JSX.Element 
{

    return (
        <Card className="max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="md" src={src} />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{cardName}</h4>
                <h5 className="text-small tracking-tight text-default-400">{cardUsername}</h5>
              </div>
            </div>
            <Button
              color="primary"
              radius="full"
              size="sm"
              href={href}
            >
              Follow
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>
              Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
            </p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{cardFollowing}</p>
              <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{cardFollowers}</p>
              <p className="text-default-400 text-small">Followers</p>
            </div>
          </CardFooter>
        </Card>
      );
}