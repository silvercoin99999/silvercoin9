import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LuUserRoundCheck, LuUserRoundPlus } from "react-icons/lu";

const LoginPage = () => {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorFromSubmit(error.message);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-item">
          <label>이메일</label>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="validation-text">이메일은 필수항목입니다.</p>
          )}
        </div>
        <div className="auth-item">
          <label>비밀번호</label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="validation-text">비밀번호는 필수항목입니다.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="validation-text">최소 6자 이상입니다.</p>
          )}

          {errorFromSubmit && <p>{errorFromSubmit}</p>}
        </div>
        <button type="submit" disabled={loading}>
          <LuUserRoundCheck />
          로그인
        </button>
        <div className="link">
          <Link to="/register">
            <LuUserRoundPlus />
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
