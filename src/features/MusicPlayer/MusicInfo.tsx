function MusicInfo() {
  return (
    <div className="w-1px flex flex-1 items-center pl-3">
      <div className="h-12 w-12 rounded-md bg-gray-300"></div>
      <div className="ml-2 flex-1">
        <div className="flex items-center">
          <p className="text-text m-0">歌曲名称</p>
          <span className="text-text-light mx-1">-</span>
          <p className="text-text-light m-0 text-12px">歌曲作者</p>
        </div>
        <div className="text-text-light mt-1 flex items-center text-12px">
          <p>00:20</p>
          <span className="mx-2">/</span>
          <p>03:20</p>
        </div>
      </div>
    </div>
  )
}

export default MusicInfo
