import { Circles } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className="m-5">
            <Circles
                height="80"
                width="80"
                color="#d97707"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        </div>
    )
}