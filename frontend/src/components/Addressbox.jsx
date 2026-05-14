import React, { useEffect } from "react";
import { MapPin, PhoneCallIcon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { userService } from "@/services/userService";

import { NEPAL_DATA,PROVINCES } from "@/data/Nepaldata";
import toast from "react-hot-toast";



const getMapUrl = (address) => {
  const parts = [
    address.localAddress,
    address.district,
    address.province,

  ].filter(Boolean).join(", ")

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts)}`
}



const EMPTY_FORM = {
  houseNum: "", localAddress: "", district: "",
  province: "", phone: "",
};



const Addressbox = ({ address, addType = "home", onSave }) => {
  const [opened, { open, close }] = useDisclosure(false);

const isEmpty = !address || Object.keys(address).length === 0 || !address.district;

  const form = useForm({
    initialValues: EMPTY_FORM,
    validate: {
      
      localAddress: (v) => v.trim().length > 0             ? null : "Local address is required",
      province:     (v) => v.trim().length > 0             ? null : "Province is required",
      district:     (v) => v.trim().length > 0             ? null : "District is required",
      phone:        (v) => /^\+?[\d\s\-]{7,15}$/.test(v)  ? null : "Enter a valid phone number",
    },
  });

  // prefill when modal opens
  useEffect(() => {
    if (opened) form.setValues({ ...EMPTY_FORM, ...address });
  }, [opened]);

  const handleProvinceChange = (e) => {
    // reset district when province changes
    form.setValues((prev) => ({ ...prev, province: e.target.value, district: "" }));
  };

  const handleSubmit = async (values) => {
    try {
      await userService.updateAddress(addType, values);
      toast.success(`${addType} address saved!`);
     onSave?.(addType, values)
      close();
    } catch (err) {
      toast.error(err.message );
    }
  };

  const inputClass = "w-full bg-cream-light border rounded-lg px-3 py-2 text-lux font-fair text-sm placeholder:text-lux/30 focus:outline-none transition-colors";
  const errorClass = "text-red-400 font-fair text-xs mt-1";
  const border     = (field) => form.errors[field] ? "border-red-400" : "border-lux/10 focus:border-lux/30";

  return (
    <div className="p-4 rounded-xl bg-lux-light/20 w-84 max-h-72">

      <Modal opened={opened} onClose={close} title={`Update ${addType} address`} centered>
        <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">

            {/* House Number */}
            <div className="col-span-1">
              <label className="text-lux/60 font-fair text-xs mb-1 block">House / Flat No. <span className="text-slate-400 text-xs">*optional</span></label>
              <input
                placeholder="1XX "
                className={`${inputClass} ${border("houseNum")}`}
                {...form.getInputProps("houseNum")}
              />
              {form.errors.houseNum && <p className={errorClass}>{form.errors.houseNum}</p>}
            </div>

            {/* Local Address */}
            <div className="col-span-1">
              <label className="text-lux/60 font-fair text-xs mb-1 block">Local Address</label>
              <input
                placeholder="Lazimpat"
                className={`${inputClass} ${border("localAddress")}`}
                {...form.getInputProps("localAddress")}
              />
              {form.errors.localAddress && <p className={errorClass}>{form.errors.localAddress}</p>}
            </div>

            {/* Province — custom onChange to reset district */}
            <div className="col-span-2">
              <label className="text-lux/60 font-fair text-xs mb-1 block">Province</label>
              <select
                value={form.values.province}
                onChange={handleProvinceChange}
                className={`${inputClass} ${border("province")} cursor-pointer`}
              >
                <option value="">Select Province</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {form.errors.province && <p className={errorClass}>{form.errors.province}</p>}
            </div>

            {/* District — disabled until province selected */}
            <div className="col-span-2">
              <label className="text-lux/60 font-fair text-xs mb-1 block">District</label>
              <select
                disabled={!form.values.province}
                className={`${inputClass} ${border("district")} cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                {...form.getInputProps("district")}
              >
                <option value="">
                  {form.values.province ? "Select District" : "Select a province first"}
                </option>
                {(NEPAL_DATA[form.values.province] || []).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {form.errors.district && <p className={errorClass}>{form.errors.district}</p>}
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <label className="text-lux/60 font-fair text-xs mb-1 block">Phone</label>
              <input
                placeholder="+977 9812XXXXXXXXXX"
                className={`${inputClass} ${border("phone")}`}
                {...form.getInputProps("phone")}
              />
              {form.errors.phone && <p className={errorClass}>{form.errors.phone}</p>}
            </div>

          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 border border-lux/20 text-lux font-fair text-sm py-2.5 rounded-lg hover:bg-cream-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-lux text-cream font-fair text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Save Address
            </button>
          </div>
        </form>
      </Modal>

      {/* address display — unchanged */}
<div className="">
  <div className="flex gap-2 items-center">
    <MapPin className="text-lux" size={24} />
    <p className="text-lg font-bold text-lux capitalize">{addType} Address</p>
  </div>
  <div className="flex justify-between">
    <p className="capitalize tracking-wider font-fair">
      {isEmpty ? "" : address?.district}
    </p>
    <button
      onClick={open}
      className="text-lux-light text-sm font-bold px-1 rounded-md underline underline-offset-2 hover:text-lux"
    >
      {isEmpty ? "Add" : "Update"}
    </button>
  </div>
</div>

{isEmpty ? (
  /* ── empty state ── */
  <div className="flex flex-col items-center justify-center max-h-36 gap-2 opacity-40">
    <MapPin size={32} className="text-lux" />
    <p className="text-sm font-fair text-lux">No address added yet</p>
  </div>
) : (
  /* ── filled state ── */
  <>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <p className="text-lux-light font-semibold">House Number :</p>
        <p className="uppercase font-fair">{address?.houseNum}</p>
      </div>
      <div>
        <p className="text-lux-light font-semibold">Area :</p>
        <p className="capitalize tracking-wider font-fair">{address?.localAddress}</p>
      </div>
      <div>
        <p className="text-lux-light font-semibold">District :</p>
        <p className="capitalize tracking-wider font-fair">{address?.district}</p>
      </div>
      <div>
        <p className="text-lux-light font-semibold">Province :</p>
        <p className="capitalize tracking-wider font-fair">{address?.province}</p>
      </div>
    </div>

    <div className="flex gap-4 mt-4 justify-between">
      <div className="flex gap-2 items-center">
        <PhoneCallIcon className="text-lux" size={24} />
        <p className="text-lg font-semibold text-lux">{address?.phone}</p>
      </div>
      
       <a href={getMapUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lux-light text-xs underline underline-offset-2 hover:text-lux transition-colors"
      >
        View on Map
      </a>
    </div>
  </>
)}


    </div>
  );
};

export default Addressbox;