import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.svg";
import { CreateQuizButton } from "./designer/CreateQuizButton";
import LayoutAuthentication from "./LayoutAuthentication";
import IconStudent from "./ui/icons/IconStudent";
import IconTeacher from "./ui/icons/IconTeacher";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const router = useRouter();
  console.log("params", router.pathname);

  const { data: session, status } = useSession();

  const [navigation, setNavigation] = useState([
    // { name: "Quiz", href: "/quiz", current: true },
    {
      name: "Student",
      href: "/student/quizzes",
      current: false,
      icon: <IconStudent />,
    },
    {
      name: "Teacher",
      href: "/teacher/quizzes",
      current: false,
      icon: <IconTeacher />,
    },
  ]);

  useEffect(() => {
    console.log("params", router.pathname);
    const index = navigation.findIndex((item) => item.href === router.pathname);

    console.log("index", index);
    onClickNavigation(index);
  }, []);

  const onClickNavigation = (selectedNavIndex) => {
    const newNavigation = [...navigation];
    newNavigation.map((nav, navIndex) => {
      if (selectedNavIndex === navIndex) {
        nav.current = true;
      }
      if (selectedNavIndex !== navIndex) {
        nav.current = false;
      }
    });
    setNavigation((prevState) => (prevState = newNavigation));
  };

  return (
    <>
      <div className="relative  select-none min-h-full ">
        <Disclosure as="nav" className="relative border-gray-200 ">
          {({ open }) => (
            <>
              <div
                id={"quiz-viewer-header"}
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              >
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <div className={`block h-3 w-auto lg:hidden`}></div>
                      <Link
                        className={"hidden w-auto lg:block "}
                        href="/student/quizzes"
                      >
                        <div
                          className={
                            "pr-2 bg-blue-500 flex items-center rounded-3xl justify-center border-blue-300 border-4 cursor-pointer"
                          }
                        >
                          <Cog6ToothIcon
                            className={
                              "h-6 w-6 mx-1 text-white animate-spin fill-blue-500 stroke-blue-300"
                            }
                          />

                          <Image
                            src={logo}
                            width={100}
                            height={30}
                            alt=""
                            className={""}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-16 sm:flex  sm:space-x-8">
                      {navigation.map((item, navIndex) => {
                        return (
                          <Link href={item.href} key={item.name}>
                            <a
                              onClick={() => onClickNavigation(navIndex)}
                              className={classNames(
                                item.current
                                  ? "border-blue-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium cursor-pointer gap-2"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              <div
                                className={`w-10 h-10 p-2 rounded-full ${
                                  item.current
                                    ? "bg-blue-100 fill-blue-500"
                                    : "bg-gray-100 fill-gray-300"
                                }`}
                              >
                                {item.icon}
                              </div>
                              {item.name}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div className={"mx-4"}>
                      <CreateQuizButton />
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <LayoutAuthentication />
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <main className={"relative h-full"}>
          <div className="mx-auto max-w-4xl h-full mb-12 h-full ">
            {/* Replace with your content */}
            <div className="h-full">
              <div className="w-full h-full rounded-2xl bg-white shadow-2xl  sm:mt-10 py-2  ">
                {children}
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
