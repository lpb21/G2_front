


export const Loading = () => {
  let nameLoad = 'We are loading the data, please wait.';
  return (
    <div className="overlay d-flex align-items-center justify-content-center">
      <div className="text-center">
      {/* <img src="../../Img/LG GIF 4.gif" alt="Loading" width="50px" height="50px" /> */}
        <i className="fas fa-3x fa-sync-alt fa-spin"></i>
        <div className="text-bold pt-2">
          {nameLoad}
        </div>
      </div>
    </div>
  )
}

