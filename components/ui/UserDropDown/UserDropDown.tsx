import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import styles from "./UserDropDown.module.scss";
import { signOut, useSession } from "next-auth/react";
type Props = {};

export default function UserDropDown({}: Props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const [show, setShow] = useState<boolean>(false);
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  console.log(show);
  const router = useRouter();
  const profileURL =
    user?.avatar !== "profile.jpg" ? user?.avatar : "/user/profile.jpg";
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <div className={styles.profileCard}>
        <Image
          onClick={() => {
            setShow(!show);
          }}
          className={styles.profileimg}
          height={50}
          width={50}
          alt={"profile"}
          src={profileURL}
        />
      </div>
      <div
        className={show ? styles.dropdown : clsx(styles.dropdown, styles.hide)}
      >
        <span>Hi! {user?.name}</span>
        <span
          onClick={() => {
            router.push("/profile");
            setShow(!show);
          }}
        >
          My Profile
        </span>
        <span
          onClick={() => {
            router.push("/myblogs");
            setShow(!show);
          }}
        >
          My Blogs
        </span>
        <span
          onClick={() => {
            //logout
            signOut();
            setShow(!show);
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}
