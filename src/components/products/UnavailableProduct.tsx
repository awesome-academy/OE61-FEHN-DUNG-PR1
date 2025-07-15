import React from 'react'

const UnavailableProduct = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center py-10 text-gray-500">
            <img src="/images/no_products.jpg" alt="No products" className="w-[200px] h-[200px] object-cover" />
            <h2 className="text-lg font-semibold mb-2">Không tìm thấy sản phẩm phù hợp</h2>
            <p>Vui lòng thử lại với bộ lọc khác hoặc xoá bộ lọc hiện tại.</p>
        </div>
    )
}

export default UnavailableProduct
