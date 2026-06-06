"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  interval?: number;
};

export default function ProductCarousel({ products: initialProducts, interval = 3000 }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => setProducts(initialProducts), [initialProducts]);

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length, interval]);

  function startAuto() {
    stopAuto();
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % Math.max(1, products.length)), interval);
  }
  function stopAuto() { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } }

  function goTo(i: number) { setIndex((i + products.length) % products.length); }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function handleSave(id: number) {
    const nameEl = document.getElementById(`name_${id}`) as HTMLInputElement | null;
    const codeEl = document.getElementById(`code_${id}`) as HTMLInputElement | null;
    const descEl = document.getElementById(`desc_${id}`) as HTMLTextAreaElement | null;
    const priceEl = document.getElementById(`price_${id}`) as HTMLInputElement | null;
    const fileEl = document.getElementById(`file_${id}`) as HTMLInputElement | null;
    setProducts((prev) => {
      return prev.map((p) => {
        if (p.id === id) {
          const copy = { ...p } as any;
          if (nameEl) copy.title = nameEl.value;
          if (codeEl) copy.code = codeEl.value;
          if (descEl) copy.description = descEl.value;
          if (priceEl) copy.price = priceEl.value || copy.price;
          if (fileEl && fileEl.files && fileEl.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
              copy.image = reader.result as string;
              setProducts((cur) => cur.map((x) => (x.id === id ? copy : x)));
            };
            reader.readAsDataURL(fileEl.files[0]);
          }
          return copy;
        }
        return p;
      });
    });
    setEditing(null);
    startAuto();
  }

  const css = `
  .main-carousel{max-width:520px;width:100%;position:relative}
  .carousel-viewport{overflow:hidden;border-radius:36px}
  .carousel-track-main{display:flex;transition:transform .5s cubic-bezier(.2,.9,.4,1.1)}
  .carousel-slide-main{flex:0 0 100%;min-width:0}
  .product-card{background:#0f1119;border-radius:36px;border:1px solid #2a2e3e;overflow:hidden;position:relative}
  .product-inner{padding:28px 24px 32px}
  .product-image-area{display:flex;justify-content:center;margin-bottom:20px}
  .product-img{width:100%;max-width:240px;border-radius:28px;aspect-ratio:1/1.2;object-fit:cover;background:#1a1e2a}
  .product-name{font-size:1.8rem;font-weight:800;letter-spacing:-.5px;margin:12px 0 8px;text-align:center;background:linear-gradient(135deg,#fff,#c0b7ff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .product-code{display:inline-block;margin:0 auto 16px;padding:6px 16px;border-radius:40px;font-size:.8rem;color:#ffb347;background:#1e212c}
  .product-desc{color:#b7c0e0;line-height:1.5;font-size:.9rem;text-align:center;margin:16px 0}
  .price-row{text-align:center;margin:16px 0 10px}
  .product-price{font-size:1.8rem;font-weight:800;color:#ff6b8b;display:inline-block;background:#1e1f2c;padding:4px 18px;border-radius:60px}
  .carousel-btn{position:absolute;top:50%;transform:translateY(-50%);background:#1e212cee;border:1px solid #ff6b8b60;color:white;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;font-size:1.8rem}
  .btn-prev{left:8px}.btn-next{right:8px}
  .dots{display:flex;justify-content:center;gap:12px;margin-top:24px}
  .dot{width:10px;height:10px;background:#3b3f55;border-radius:50%;cursor:pointer}
  .dot.active{background:#ff6b8b;width:24px;border-radius:12px}
  @media (max-width:550px){.product-name{font-size:1.5rem}.product-price{font-size:1.4rem}.carousel-btn{width:36px;height:36px;font-size:1.4rem}}
  `;

  return (
    <div className="main-carousel">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="carousel-viewport" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        <div className="carousel-track-main" style={{ transform: `translateX(-${index * 100}%)` }}>
          {products.map((p) => (
            <div key={p.id} className="carousel-slide-main" data-slide-id={p.id}>
              <div className="product-card">
                <button className="edit-product-btn" style={{position:'absolute',top:16,right:16,zIndex:20}} onClick={() => setEditing(editing === p.id ? null : p.id)}>✏️ Edit</button>
                <div className="product-inner">
                  <div className="product-image-area">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} className="product-img" />
                    ) : (
                      <div className="product-img" style={{display:'flex',alignItems:'center',justifyContent:'center',color:'#7b85aa'}}>📸 Upload {p.title}</div>
                    )}
                  </div>
                  <div className="product-name">{p.title}</div>
                  <div style={{textAlign:'center'}}><span className="product-code">{(p as any).code ?? p.id}</span></div>
                  <div className="product-desc">{p.description}</div>
                  <div className="price-row"><span className="product-price">{typeof (p as any).price === 'number' ? `Tk ${(p as any).price}` : (p as any).price}</span></div>
                </div>

                {editing === p.id ? (
                  <div className="edit-panel" style={{display:'flex',flexDirection:'column',gap:12,padding:18,margin:'12px 20px 20px 20px',borderRadius:24}}>
                    <input id={`name_${p.id}`} defaultValue={p.title} />
                    <input id={`code_${p.id}`} defaultValue={(p as any).code ?? ''} />
                    <textarea id={`desc_${p.id}`} defaultValue={p.description} />
                    <input id={`price_${p.id}`} defaultValue={String((p as any).price ?? '')} />
                    <input id={`file_${p.id}`} type="file" accept="image/*" />
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={() => handleSave(p.id)} style={{background:'#2ecc71',border:'none',padding:10,borderRadius:40}}>💾 Save</button>
                      <button onClick={() => setEditing(null)} style={{background:'#5a5f7a',border:'none',padding:10,borderRadius:40}}>Cancel</button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn btn-prev" onClick={() => { stopAuto(); prev(); startAuto(); }}>‹</button>
      <button className="carousel-btn btn-next" onClick={() => { stopAuto(); next(); startAuto(); }}>›</button>

      <div className="dots">
        {products.map((_, i) => (
          <div key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => { stopAuto(); goTo(i); startAuto(); }} />
        ))}
      </div>
    </div>
  );
}
