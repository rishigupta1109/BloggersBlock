import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./BlogItem.module.scss";
import viewIcon from "../../../public/images/view.svg";
import CustomButton from "../../ui/CustomButton/CustomButton";
import editIcon from "../../../public/images/edit_icon.svg";
import deleteIcon from "../../../public/images/delete.svg";
import { deleteBlog } from "../../../utils/services";
import { AlertContext } from "./../../../store/AlertContext";
import Modal from "../../Modal/Modal";
type Props = {
  data: IBlog;
  isMyBlog?: boolean;
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
};

export default function BlogItem({ data, isMyBlog, setBlogs }: Props) {
  const {
    _id,
    title,
    body,
    image,
    author,
    authorName,
    createdAt,
    authorAvatar,
    views,
  } = data;
  console.log(data);
  const tags = data.tags.split(",").map((tag) => tag.trim());
  const description = body.slice(0, 50) + "...";
  const { darkMode } = useContext(GlobalContext);
  let classname = styles.container;
  if (darkMode) classname = clsx(classname, styles.dark);
  const router = useRouter();
  const handleOpenBlog = () => {
    router.push(`/blogs/${_id}`);
  };
  let previewImage: string =
    typeof image !== "string"
      ? URL.createObjectURL(image)
      : "/blogimages/" + image;
  if (previewImage === "/blogimages/")
    previewImage =
      "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  const imageURL = authorAvatar
    ? "/user/" + authorAvatar
    : "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  return (
    <div className={classname} onClick={handleOpenBlog}>
      <Image
        src={previewImage}
        alt={title}
        className={styles.image}
        height={350}
        width={350}
      />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <Image
            src={imageURL}
            alt="profile"
            className={styles.profilepic}
            height={30}
            width={30}
          />
          <div>
            <p>{authorName}</p>
            <time>{new Date(createdAt).toDateString()}</time>
          </div>
        </div>
        <span>
          <Image src={viewIcon} alt={"view"} height={20} width={20} />
          {views}
        </span>
      </div>
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        <Viewer value={description} />
      </div>
      <div className={styles.tagContainer}>
        <Tags tags={tags} />
      </div>
      {isMyBlog && <AuthorButtons setBlogs={setBlogs} id={_id} />}
    </div>
  );
}

const AuthorButtons = ({
  id,
  setBlogs,
}: {
  id: string;
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
}) => {
  const { Message } = useContext(AlertContext);
  const { setLoading } = useContext(GlobalContext);
  const [showModal, setShowModal] = React.useState(false);
  const deleteBlogHandler = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteBlog(id);
      console.log(res);
      Message().success(res.message);
      if (setBlogs) setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err: any) {
      console.log(err);
      Message().error(err);
    }
    setLoading(false);
  };
  return (
    <div className={styles.authorbtns}>
      <Modal
        text="Are you sure you want to delete this blog?"
        show={showModal}
        onYes={(e) => {
          e.stopPropagation();
          deleteBlogHandler(id);
        }}
        onNo={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}
      />
      <CustomButton
        bg="transparent"
        type="filled"
        corner="100%"
        border="none"
        hoverbg="transparent"
        padding="10px"
        onClick={(e) => {
          e.stopPropagation();
        }}
        link={`/myblogs/${id}`}
      >
        <Image src={editIcon} alt="edit" height={20} width={20} />
      </CustomButton>
      <CustomButton
        padding="10px"
        bg="transparent"
        type="filled"
        corner="100%"
        border="none"
        hoverbg="transparent"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <Image src={deleteIcon} alt="delete" height={20} width={20} />
      </CustomButton>
    </div>
  );
};
