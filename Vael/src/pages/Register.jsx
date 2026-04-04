import React, { useState } from 'react'
import Animatedbtn from '../common/Animatebtn'
import Heading from "../common/Heading"

const Register = () => {
  const [formmode, setFormMode] = useState("register");
  const [formdata, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (formdata.password !== formdata.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    const payload = {
      firstName: formdata.firstName,
      lastName: formdata.lastName,
      email: formdata.email,
      password: formdata.password,
    }
    console.log('submit', payload)
    // backend post goes here api tanne kamm

  }

  const isRegister = formmode === "register";

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-cream-light">

      {/* moving vael img */}
      <div
        className={` hidden w-0 lg:block absolute  z-20 lg:w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-in-out ${
          isRegister ? "left-0 translate-x-0" : "left-0 translate-x-full"
        }`}
        style={{ backgroundImage: "url('/main.png')" }}
      >
        <div className="w-full h-full bg-black/20 flex items-end p-10">
          <p className="font-cormorant text-white text-5xl">
            VA<span className="text-lux">E</span>L
          </p>
        </div>
      </div>

      {/* form */}
      <div
        className={`absolute top-0 z-10 w-screen lg:w-1/2 h-full bg-cream-light flex items-center justify-center px-8 py-12 transition-transform duration-500 ease-in-out ${
          isRegister ? "left-0 lg:translate-x-full" : "left-0 lg:translate-x-0"
        }`}
      >
        <div className="w-full max-w-sm relative min-h-125">



          {/* register garne form */}
          <div className={`transition-all duration-700 ease-in-out absolute inset-0 ${
            isRegister
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-8 pointer-events-none"
          }`}>
            <Heading subheading={"New here"} mainheading={"Create an"} termheading={"Account"} />
            <p className="text-hair text-sm mb-8">
              Already have one?{' '}
              <button onClick={() => setFormMode("login")} className="underline">
                Sign in
              </button>
            </p>

            {error && <p className="text-red-500 text-xs mb-4 tracking-wide">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase text-hair">First Name</label>
                  <input
                    type="text" name="firstName" value={formdata.firstName}
                    onChange={handleChange} placeholder="Aria" required
                    className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase text-hair">Last Name</label>
                  <input
                    type="text" name="lastName" value={formdata.lastName}
                    onChange={handleChange} placeholder="Voss" required
                    className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm uppercase text-hair">Email</label>
                <input
                  type="email" name="email" value={formdata.email}
                  onChange={handleChange} placeholder="your@email.com" required
                  className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm uppercase text-hair">Password</label>
                <input
                  type="password" name="password" value={formdata.password}
                  onChange={handleChange} placeholder="Min. 8 characters" required
                  className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase text-hair">Confirm Password</label>
                <input
                  type="password" name="confirmPassword" value={formdata.confirmPassword}
                  onChange={handleChange} placeholder="Repeat password" required
                  className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                />
              </div>

              <button type="submit" className="bg-ink text-white">
                <Animatedbtn str={"Create Account"} />
              </button>
            </form>
          </div>

          {/* login ko form*/}
          <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${
            !isRegister
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-8 pointer-events-none"
          }`}>
            <Heading subheading={"Welcome back"} mainheading={"Sign"} termheading={"In"} />
            <p className="text-hair text-sm mb-8">
              Don't have an account?{' '}
              <button onClick={() => setFormMode("register")} className="underline">
                Register
              </button>
            </p>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase text-hair">Email</label>
                <input
                  type="email" name="email" placeholder="your@email.com" required
                  className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase text-hair">Password</label>
                <input
                  type="password" name="password" placeholder="Your password" required
                  className="border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full"
                />
              </div>

              <button type="submit" className="bg-ink text-white">
                <Animatedbtn str={"Sign In"} />
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Register