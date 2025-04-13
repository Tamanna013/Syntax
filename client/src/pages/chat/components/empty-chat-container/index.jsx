const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center transition-all hidden duration-1000">
      <img
        src="/logo.png"
        alt="empty-chat"
        className="w-40 h-40 object-contain opacity-70"
      />
      <h3 className="text-sm opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl transition-all duration-300 text-center">Select a chat to start messaging</h3>
    </div>
  );
};

export default EmptyChatContainer;
