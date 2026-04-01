import React, { useEffect } from 'react'

function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/55 flex items-center justify-center z-[999] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col" style={{ animation: 'modalFade 0.25s ease' }}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E5E2DE]">
          <h2 className="text-xl font-semibold text-[#1C1C1C]">{title}</h2>
          <button onClick={onClose} className="text-3xl leading-none text-[#999] hover:text-[#1C1C1C] transition-colors">×</button>
        </div>
        <div className="px-6 py-5 overflow-y-auto max-h-[70vh]">{children}</div>
        {footer && <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E5E2DE]">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
