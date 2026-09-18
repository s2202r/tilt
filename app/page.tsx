const drops=[
{name:"55″ OLED TV",img:"https://www.zigzag.am/media/catalog/product/cache/f921779820c17518bee1be5dc7466b4f/0/1/0147269.png",brand:"Samsung",market:"₹69,990",price:"₹59,999",buyers:287,next:500,nextPrice:"₹57,999",pct:57,accent:"violet"},
{name:"PlayStation 5 Slim",img:"https://maxmobiles.ru/images/detailed/78/2_wg0t-mk.jpg",brand:"Sony",market:"₹54,990",price:"₹49,499",buyers:412,next:500,nextPrice:"₹47,999",pct:82,accent:"lime"},
{name:"MacBook Air",img:"https://s3.zoommer.ge/zoommer-images/thumbs/0136920_apple-mgna3lla-macbook-air-13-inch-2020-silver_550.png",brand:"Apple",market:"₹99,900",price:"₹92,999",buyers:164,next:250,nextPrice:"₹89,999",pct:66,accent:"coral"}
];
export default function Home(){return <main className="home">
<header className="homeNav"><a className="brand" href="/">TILT<span>↘</span></a><div className="navCenter"><a href="#drops">Drops</a><a href="#how">How it works</a><a href="/seller">For sellers</a></div><div className="navActions"><a className="navGhost" href="/login">Log in</a><a className="navPrimary" href="/dashboard">My TILTs</a></div></header>
<section className="heroXL">
<div className="heroNoise"/>
<div className="heroCopy">
<div className="livePill"><span className="pulse"/> LIVE COLLECTIVE COMMERCE</div>
<h1>THE PRICE<br/>MOVES <em>WITH YOU.</em></h1>
<p className="heroLead">Join buyers who want the same thing. Commit at the price you would actually pay. More real demand unlocks a better deal for everyone.</p>
<div className="heroCtas"><a className="ctaPrimary" href="#drops">Explore live TILTs <b>↘</b></a><a className="ctaSecondary" href="/seller">I’m a seller <b>→</b></a></div>
<div className="trustRow"><span>No fake demand</span><span>1% commitment</span><span>Best unlocked price</span></div>
</div>
<div className="tiltVisual">
<div className="priceOrb orbA">₹69,990<small>START</small></div>
<div className="priceOrb orbB">₹62,999<small>UNLOCKED</small></div>
<div className="priceOrb orbC">₹57,999<small>NEXT TILT</small></div>
<div className="tiltArrow">↘</div>
<div className="visualCaption">more committed buyers<br/><b>push the price down</b></div>
</div>
</section>
<section className="marquee"><div>JOIN · COMMIT · SHARE · UNLOCK · SAVE · TILT THE PRICE · JOIN · COMMIT · SHARE · UNLOCK · SAVE · TILT THE PRICE ·</div></section>
<section id="drops" className="dropsSection">
<div className="sectionHead"><div><span className="sectionKicker">LIVE NOW</span><h2>Deals that get better<br/>when people show up.</h2></div><p>Preview data while TILT is in test mode. Production counts will only use financially-backed commitments.</p></div>
<div className="dropGrid">{drops.map((d,i)=><article className={"dropCard "+d.accent} key={d.name}>
<div className="dropTop"><span className="dropIndex">0{i+1}</span><span className="statusDot">LIVE PREVIEW</span></div>
<div className="dropImage"><img src={d.img} alt={d.brand+" "+d.name}/></div>
<div className="dropBody"><div className="brandLine">{d.brand}</div><h3>{d.name}</h3><div className="priceRow"><div><small>UNLOCKED</small><strong>{d.price}</strong></div><div className="market"><small>REFERENCE</small><s>{d.market}</s></div></div>
<div className="unlockTrack"><i style={{width:d.pct+"%"}}/></div>
<div className="unlockMeta"><b>{d.buyers} committed <span>· preview</span></b><span>{d.next-d.buyers} more → {d.nextPrice}</span></div>
<a className="joinBtn" href={"/drop/"+d.name.toLowerCase().replaceAll(" ","-").replaceAll("″","")}>JOIN THIS TILT <b>↘</b></a></div>
</article>)}</div>
</section>
<section id="how" className="howSection">
<div className="howIntro"><span className="sectionKicker">THE MECHANIC</span><h2>Not a coupon.<br/>Not a flash sale.<br/><em>Collective leverage.</em></h2></div>
<div className="howRail">
<div className="howCard"><span>01</span><h3>Name your buy price</h3><p>Tell TILT the maximum price where you are genuinely ready to purchase.</p></div>
<div className="howCard featured"><span>02</span><h3>Commit 1%</h3><p>Your small commitment turns interest into real buying power. It is adjusted in your final purchase.</p></div>
<div className="howCard"><span>03</span><h3>Unlock together</h3><p>When more qualified buyers join, sellers can compete for the demand and the price tilts lower.</p></div>
</div>
</section>
<section className="sellerStrip"><div><span className="sectionKicker">SELLERS</span><h2>Stop buying clicks.<br/>Bid on ready demand.</h2></div><a href="/seller" className="sellerCta">OPEN SELLER DESK →</a></section>
<footer className="homeFooter"><div className="brand">TILT<span>↘</span></div><p>More buyers. Lower prices.</p><div><a href="/login">Buyer login</a><a href="/seller/login">Seller login</a><a href="/admin/login">Admin</a></div></footer>
</main>}