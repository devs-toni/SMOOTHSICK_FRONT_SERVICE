import { Modal } from "flowbite-react"

const AddSongModal = ({ open, setOpen }) => {
  return (
    <>
      <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible>
        <Modal.Body className='bg-zinc-900'>
         {/*  <div className='flex justify-center flex-col items-center gap-5'>
            <span className='text-white'>Upload Song</span>
            <div className=" flex flex-col gap-5">
              <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Title
                </span>
                <input type="text" placeholder='Playlist name' className='bg-zinc-600 rounded mb-5'
                  {...register("text")}
                />
                <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">

                </span>
                <input type="text" placeholder='Playlist name' className='bg-zinc-600 rounded mb-5'
                  {...register("text")}
                />
                <Button
                  className='bg-deezer'
                  onClick={handleSubmit(onSubmit)}
                >
                  Create
                </Button>
              </form>
            </div>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddSongModal