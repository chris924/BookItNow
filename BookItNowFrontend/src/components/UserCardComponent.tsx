import { CardHeader, Divider, CardBody, CardFooter, Link, Image, Card, Button, Avatar } from "@nextui-org/react";
import UseNavigation from "../hooks/UseNavigation";
import { motion } from "framer-motion";


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

    const {navigateToGiHubProfile} = UseNavigation();

    

    return (
        <motion.div
        initial= {{opacity: 0, scale: 0, x: 30}}
        whileInView={{opacity: 1, scale: 1, x: 0}}
        transition= {{duration: 0.6}}
        viewport={{once: true}}
        >
        <Card className="max-w-[440px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="lg" src={src} />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{cardName}</h4>
                <h5 className="text-small tracking-tight text-default-400">@{cardUsername}</h5>
              </div>
            </div>
            <Button
              color="secondary"
              radius="full"
              size="md"
              href={href}
              onClick={() => navigateToGiHubProfile()}
            >
              Follow
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-medium text-default-400">
            <p>
              Fullstack developer. Join me on this coding adventure!
            </p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-medium">{cardFollowing}</p>
              <p className=" text-default-400 text-medium">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-medium">{cardFollowers}</p>
              <p className="text-default-400 text-medium">Followers</p>
            </div>
          </CardFooter>
        </Card>
        </motion.div>
      );
}