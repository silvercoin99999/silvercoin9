import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import md5 from "md5";
import app, { db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { set, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { LuUserRoundCheck } from "react-icons/lu";

const RegisterPage = () => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      const userData = {
        uid: createdUser.user.uid,
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      };

      dispatch(setUser(userData));

      set(ref(db, `users/${createdUser.user.uid}`), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
        grade: 2,
      });
    } catch (error) {
      console.error(error);
      setErrorFromSubmit(error.message);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 3000);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-item">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="validation-text">이메일은 필수항목입니다.</p>
          )}
        </div>
        <div className="auth-item">
          <label>별명</label>
          <input
            type="text"
            name="name"
            placeholder="별명"
            {...register("name", { required: true, maxLength: 10 })}
          />
          {errors.name && errors.name.type === "required" && (
            <p className="validation-text">별명은 필수항목입니다.</p>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <p className="validation-text">10자를 넘으면 안됩니다.</p>
          )}
        </div>
        <div className="auth-item">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="validation-text">비밀번호는 필수항목입니다.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="validation-text">최소 6자 이상입니다.</p>
          )}
        </div>

        {errorFromSubmit && <p>{errorFromSubmit}</p>}

        <button type="submit" disabled={loading}>
          <LuUserRoundCheck />
          회원가입
        </button>
        <div className="link">
          <Link to={"/login"}>이미 회원입니다.</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
