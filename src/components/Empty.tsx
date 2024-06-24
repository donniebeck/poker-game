interface PlaceHolder {
  title: string;
}

const PlaceHolder = ( { title } : PlaceHolder ) => {
    return (
      <div className="card p-0 m-0 border-none select-none w-36 h-52.5">
        <img
          src={'/cards/Shadow.svg'} 
          alt={`${title}`} 
          className="block object-contain"
        />
      </div>
    );
  };

  export default PlaceHolder;