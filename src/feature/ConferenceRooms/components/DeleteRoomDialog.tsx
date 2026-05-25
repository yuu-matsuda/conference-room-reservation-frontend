import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "../../../components/Button/Button";

type DeleteRoomData = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  deleteRoom: () => void;
};
export const DeleteRoomDialog = (data: DeleteRoomData) => {
  return (
    <div>
      <Dialog open={data.isOpen} onClose={() => data.setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-md border bg-white p-16">
            <p className="text-lg">この会議室を削除しますか？</p>
            <div className="flex gap-4">
              <Button
                name="削除"
                type="button"
                colorType="danger"
                onClick={data.deleteRoom}
              ></Button>
              <Button
                name="閉じる"
                type="button"
                colorType="normal"
                onClick={() => data.setIsOpen(false)}
              ></Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
