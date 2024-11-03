import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, PlusCircleIcon, BellDotIcon, Sun, Grid } from "lucide-react";
import Image from "next/image";

const Topbar = () => {
  return (
    <>
      <div className="bg-primary-foreground border-b flex items-center sm:gap-10 gap-5 h-20 justify-between sm:px-10 px-5 py-2">
        <div className="flex items-center sm:w-auto sm:h-auto h-[31px] w-[73.16px]">
          <Image
            src="/logo.png"
            alt="WebHook Logo"
            width={73} 
            height={31}
            className="object-contain"
          />
        </div>
        <div className="flex items-center sm:gap-6 gap-2 w-full justify-end">
          {/* <Input type="text" placeholder="Search" className={'bg-transparent w-full placeholder:text-white text-white border-[#1E4470] max-w-[30rem]'} parentStyle={'max-w-[30rem]'} stroke={'white'} endIcon={Search} /> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit rounded-xl overflow-hidden ring-offset-0 focus-visible:ring-o ">
              <div className="flex items-center">
                <div className="flex items-center text-sm">
                  <h5 className="font-semibold hidden sm:block">
                    WebHook:&nbsp;
                  </h5>
                  <p className="sm:text-sm text-xs">Selected Hook</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"!bg-white min-w-[21rem] mt-5"}>
              <>
                <DropdownMenuLabel>
                  <div className="flex gap-2 items-center font-normal text-sm cursor-pointer">
                    Add Project
                    <PlusCircleIcon />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className={"bg-[#D2D2D2]"} />
              </>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full gap-2 cursor-pointer">
                  <p>WebHook</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full gap-2 cursor-pointer">
                  <p>WebHook</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="DashboardTopBar flex items-center justify-center sm:gap-6 gap-2">
            <Sun className={"cursor-pointer"} />
            <BellDotIcon
              className={"cursor-pointer sm:w-auto w-[20px] sm:h-auto h-[20px]"}
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit rounded-xl overflow-hidden ring-offset-0 ">
                <div className="flex items-center gap-3 p-2 bg-primary-gradient text-black_v2 sm:h-auto h-[39px]">
                  <Avatar
                    className={
                      "sm:w-[44px] sm:h-[44px] w-[30px] h-[30px] object-cover"
                    }
                  >
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 pr-2">
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs hidden md:flex">
                      Danish
                    </span>
                    {/* <Svgs.ArrowDown fill="black" /> */}
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={"cursor-pointer hover:bg-secondary-base"}
                >
                  Profile
                </DropdownMenuItem>
                <>
                  {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                  <DropdownMenuItem
                    className={"cursor-pointer hover:bg-secondary-base"}
                  >
                    Team Members
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={"cursor-pointer hover:bg-secondary-base"}
                  >
                    Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
                <DropdownMenuItem
                  className={"cursor-pointer hover:bg-secondary-base"}
                >
                  <div className="flex gap-2 items-center text-red-600">
                    {/* <Svgs.LogOutIcon width={'15'} height={'15'} /> */}
                    Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
