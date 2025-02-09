import React from 'react'

const roughwork = () => {
  return (
    <View
      id="sidebar"
      className=" fixed top-0 min-h-screen bg-pink-200 w-9/12 -left-full transition-transform duration-1000 ease-in-out"
    >
      <View className="color1 h-9 grid grid-cols-12 ">
        <View className=" col-span-2"></View>
        <View className=" col-span-8">
          {/* <Text className=" font-bold text-white">
            <span className=" font-bold text-2xl textcolor1">Uni</span>
            Nova
          </Text> */}
        </View>
        <View className=" col-span-2">
          <CgClose
            onClick={closeSideBar}
            className=" font-bold text-2xl text-white cursor-pointer"
          />
        </View>
      </View>
      <View className=" grid grid-cols-12 m-2 p-5 h-20 rounded-xl overflow-hidden text-white color1">
        <View className=" col-span-4 flex justify-between gap-3 h-9 bg-white w-9 rounded-full">
          <Image
            source={{
              uri: `http://school.test/api/image/${studentInfor.img}`,
            }}
            className=" rounded-full"
            alt="profile"
          />
          <Text className=" text-xs">hello {`${studentInfor.oname}`}</Text>
        </View>
        <View className=" col-span-8"></View>
      </View>

      <View className=" h-10 border-l-4 pl-4 border-gray-950 flex m-5 pt-2 bg-pink-200 shadow-even ">
        <MdDashboard className=" text-2xl text-fuchsia-700 bg-transparent" />
        <Text className=" font-bold ml-2">Dashboard</Text>
      </View>
      <View className=" h-10 pl-4 flex m-5  ">
        <TbCashRegister className=" text-2xl text-red-500 bg-transparent" />
        <Text className=" font-bold ml-2">Register</Text>
      </View>
      <View className=" h-10 pl-4 flex m-5  ">
        <MdAccountBalance className=" text-2xl text-red-500 bg-transparent" />
        <a
          className=" font-bold ml-2"
          onClick={() => {
            setOpenAccount((pre) => !pre);
            closeSideBar();
          }}
        >
          Accounts
        </a>
      </View>
      <View className=" h-10 pl-4 flex m-5  ">
        <BiFile className=" text-2xl text-red-500 bg-transparent" />
        <a
          onClick={() => {
            closeSideBar();
            setSemester(true);
          }}
          className=" font-bold ml-2"
        >
          Results
        </a>
      </View>
      <View className=" h-10 pl-4 flex m-5 ">
        <BiFile className=" text-2xl text-red-500 bg-transparent" />
        <a
          className=" font-bold ml-2"
          onClick={() => {
            closeSideBar();
            setToDo((pre) => !pre);
          }}
        >
          To-Do
        </a>
      </View>
      <View className=" h-10 pl-4 flex m-5  ">
        <TextiExam className=" text-2xl text-red-500 bg-transparent" />
        <a
          onClick={handleEtestButton}
          className=" cursor-pointer font-bold ml-2"
        >
          E-Test
        </a>
      </View>

      <View className=" h-10 pl-4 flex m-5  ">
        <BiBookOpen className=" text-2xl text-red-500 bg-transparent" />
        <Text className=" font-bold ml-2">Courses</Text>
      </View>

      <View className=" h-10 pl-4 flex m-5  ">
        <BiLogOut className=" text-2xl text-red-500 bg-transparent" />
        <Text className=" font-bold ml-2">Logout</Text>
      </View>
    </View>
  );
}

export default roughwork