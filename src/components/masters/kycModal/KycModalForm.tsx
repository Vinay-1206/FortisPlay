'use client';

import { X, Calendar, Plus } from 'lucide-react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function KycModalForm({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black/45"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-[78%] bg-white shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-[18px] font-semibold text-gray-900">
                        KYC Personal Info
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-black"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    <form>
                        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                            {/* Row 1 */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="eg: MDS"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            {/* Row 2 */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Country Code
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                    <option>+91</option>
                                    <option>+1</option>
                                    <option>+44</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Date of Birth
                                </label>

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm"
                                    />
                                    <Calendar
                                        size={18}
                                        className="absolute right-3 top-3 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Nearest Outlet
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Row 3 */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Document Type
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                    <option>Aadhaar Card</option>
                                    <option>PAN Card</option>
                                    <option>Passport</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Document ID
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Upload Document
                                </label>
                                <input
                                    type="file"
                                    className="block h-10 w-full rounded-md border border-gray-300 text-sm file:mr-2 file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Upload Selfie
                                </label>
                                <input
                                    type="file"
                                    className="block h-10 w-full rounded-md border border-gray-300 text-sm file:mr-2 file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700"
                                />
                            </div>

                            {/* Row 4 */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Occupation
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Source of Income
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Income
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Nationality
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Row 5 */}
                            <div className="col-span-2">
                                <label className="mb-1 block text-sm text-gray-700">
                                    Current Address
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="mb-1 block text-sm text-gray-700">
                                    Permanent Address
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            {/* Row 6 */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Place of Birth
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    Country
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-700">
                                    KYC Status
                                </label>
                                <select className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm">
                                    <option>Select</option>
                                    <option>Pending</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t bg-white px-6 py-3">
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus size={16} />
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}