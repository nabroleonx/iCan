import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export default function CommunityGuidelines({ isOpen, setIsOpen }) {
  let title = useRef(null);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={title}
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-md max-h-96 font-mono transform overflow-y-scroll rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  ref={title}
                  as="h3"
                  className="text-lg md:text-2xl leading-6 border-b border-slate-300 dark:border-slate-700 pb-2 mb-2 text-center"
                >
                  iCan community guidelines
                </Dialog.Title>
                <p className="text-xs md:text-sm text-justify">
                  iCan is a vast network of communities that are created, run,
                  and populated by you, the iCan users. Through iCan, you can
                  discuss, learn, debate, support, and connect with people who
                  share your interests, and we encourage you to find—or even
                  create—your home on iCan.
                </p>
                <p className="mt-3 text-lg md:text-2xl py-3 border-t border-slate-300 dark:border-slate-700">
                  Rules
                </p>
                <ul className="text-xs md:text-sm pt-3 border-t border-slate-300 dark:border-slate-700 divide-y divide-slate-300 dark:divide-slate-700">
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 1
                    </span>{" "}
                    Remember the human. iCan is a place for creating community
                    and belonging, not for attacking marginalized or vulnerable
                    groups of people. Everyone has a right to use iCan free of
                    harassment, bullying, and threats of violence. Communities
                    and users that incite violence or that promote hate based on
                    identity or vulnerability will be banned.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 2
                    </span>{" "}
                    Abide by community rules. Post authentic content into
                    communities where you have a personal interest, and do not
                    cheat or engage in content manipulation (including spamming,
                    vote manipulation, ban evasion, or subscriber fraud) or
                    otherwise interfere with or disrupt iCan communities.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 3
                    </span>{" "}
                    Respect the privacy of others. Instigating harassment, for
                    example by revealing someone’s personal or confidential
                    information, is not allowed. Never post or threaten to post
                    intimate or sexually-explicit media of someone without their
                    consent.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 4
                    </span>{" "}
                    Do not post or encourage the posting of sexual or suggestive
                    content involving minors.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 5
                    </span>{" "}
                    You don’t have to use your real name to use iCan, but don’t
                    impersonate an individual or an entity in a misleading or
                    deceptive manner.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 6
                    </span>{" "}
                    Ensure people have predictable experiences on iCan by
                    properly labeling content and communities, particularly
                    content that is graphic, sexually-explicit, or offensive.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 7
                    </span>{" "}
                    Keep it legal, and avoid posting illegal content or
                    soliciting or facilitating illegal or prohibited
                    transactions.
                  </li>
                  <li className="flex flex-col text-justify py-3">
                    <span className="font-medium text-base md:text-lg ml-3">
                      📝 Rule 8
                    </span>{" "}
                    Don’t break the site or do anything that interferes with
                    normal use of iCan.
                  </li>
                </ul>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-right rounded-md border border-slate-400 dark:border-slate-700 bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-2 text-sm font-medium hover:bg-slate-400 dark:hover:bg-slate-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
