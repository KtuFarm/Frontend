import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  buttons?: ReactNode;
  error?: string;
}

export const Modal = ({
  isOpen,
  title,
  content,
  buttons,
  error,
}: ModalProps): JSX.Element => {
  return (
    <div
      hidden={!isOpen}
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`text-center sm:mt-0 sm:text-left ${
                  buttons ? 'mt-3' : 'my-3'
                }`}
              >
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{content}</p>
                </div>
                {error != null && error !== '' ? (
                  <div className="mt-2">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {buttons ? (
            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              {buttons}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
