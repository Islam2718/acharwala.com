import React from 'react';

const Blog: React.FC = () => {
  return (    
    <div className="App">
            {/* <!-- blog area start--> */}
      <section className="blog-page-area py-5">
          <div className="container">
            <p className="heading-text-center text-center">ব্লগ</p>
            <div className="heading-border"></div>
              <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-12 mx-auto">
                      <div className="blog-right-are">
                        <div className="row">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control input-design " placeholder="ব্লগ খোঁজ  করুন ..."
                                    aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <button className=" theme-btn" type="submit" id="basic-addon2">জমা দিন</button>
                            </div>
                            <div className="col-md-12 my-2">
                                <div className="blog-card border-0">
                                    <div className="blog-image ">
                                        <img src="assets/img/blog/blog-1.jpg" alt="n/a" className="img-fluid"/>
                                    </div>
                                    
                                    <div className="blog-content">
                                        <div className="blog-author text-center  mt-3">
                                              ছবি: শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় করনীয়
                                        </div>
                                        <div className="blog-author d-flex  mt-4">
                                              <a href="#0"> <i className="fa-solid fa-user"></i> ফাহাদ হাসান</a><a href="#0"> 
                                              <i className="fa-solid fa-calendar-days ms-3"></i> ১০ মার্চ, ২০২৪</a>
                                        </div>
                                        <div className="content-title"><a href="#0">
                                                <h3 className="p-0">শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় করনীয়</h3>
                                            </a>
                                        </div>
                                        <div className="content-excerpt">
                                          <p>
                                          শৈত্য প্রবাহ একটি গুরুত্বপূর্ণ কৃষি সমস্যা, যা বিভিন্ন ফসলে অনেকটি প্রকারে ক্ষতি উত্পন্ন করতে পারে, এবং এটি মুখোমুখি সম্পর্কে একে অপরকে মারতে পারে। এর মধ্যে বোর ধানও একটি জনপ্রিয় ফসল, যা শৈত্য প্রবাহের কারণে প্রতিষ্ঠানিত হয়ে যায়। তাই এই সময়ে বোর ধানের চারা রক্ষার জন্য সঠিক পদক্ষেপ গ্রহণ করা গুরুত্বপূর্ণ।
                                          </p>

                                          <p className='sub-heading'>1. ভূমির বুদ্ধিমত্তা:</p>
                                          <p>
                                            বোর ধানের চারা রক্ষার জন্য ভূমির বুদ্ধিমত্তা গুরুত্বপূর্ণ। ভূমির পোষণ অবশ্যই ভালো করা উচিত এবং পুরানো সারের মাধ্যমে আমিষ সর্বাধিক পৌষ্টিক করণীয়। আস্তে আস্তে ভূমির পরিস্থিতি মনিটর করতে হবে এবং প্রয়োজনে উপযুক্ত সার সরাচ্ছে কিনা তা নিশ্চিত করতে হবে।
                                          </p>
                                          <p className='sub-heading'>2. উচ্চ জাতের চারা বুঝুন:</p>
                                          <p>
                                            বোর ধানের জন্য সঠিক চারা বেছে নিতে হলে আগে তার জাত নির্বাচন করা উচিত। উচ্চ জাতের চারা শৈত্য প্রবাহের ক্ষতি থেকে ভালোভাবে রক্ষা করতে সাহায্য করতে পারে।
                                          </p>
                                          <p className='sub-heading'>3. সঠিক সময়ে চারা রোপণ:</p>
                                          <p>
                                            শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় সঠিক সময়ে চারা রোপণ করা গুরুত্বপূর্ণ। সাধারিত অবস্থায়, শৈত্য প্রবাহে সংক্ষেপে বোর ধানের চারা রোপণ করতে মাঝামাঝি ফেব্রুয়ারি থেকে মার্চ মাস পর্যন্ত করা উচিত।
                                          </p>
                                          <p className='sub-heading'>4. বন্ধুবার্তা ব্যবহার:</p>
                                          <p>
                                          শৈত্য প্রবাহ থেকে চারা রক্ষায় বন্ধুবার্তা ব্যবহার করা হতে পারে। এটি চারা স্থিতির পর্যায়ে বৃদ্ধি বাধাতে সাহায্য করতে পারে এবং চারাগুলি সুরক্ষিত থাকতে সাহায্য করতে পারে।
                                          </p>
                                          <p className='sub-heading'>5. আবশ্যকের সারাংশ:</p>
                                          <p>
                                          চারা রক্ষায় বোর ধানের জন্য উচিত সারাংশ প্রদান করা গুরুত্বপূর্ণ। সারাংশে প্রযুক্তির মাধ্যমে আবশ্যক উপাদানগুলি চারা প্রবর্তন করতে সাহায্য করতে পারে এবং চারাগুলির দৃঢ়তা বাড়াতে সাহায্য করতে পারে।
                                          </p>

                                         <p className='sub-heading'>সংক্ষেপঃ</p>
                                          <p>
                                            শৈত্য প্রবাহ একটি কৃষি সমস্যা যা বোর ধানে ক্ষতি উত্পন্ন করতে পারে, তবে সঠিক পদক্ষেপ নেওয়া যেতে পারে চারা রক্ষার জন্য। ভূমির ভালো বুদ্ধিমত্তা, উচ্চ জাতের চারা বেছে নেওয়া, সঠিক সময়ে চারা রোপণ, বন্ধুবার্তা ব্যবহার এবং সঠিক সারাংশ প্রদান করা বোর ধানের চারা রক্ষায় সাহায্যকারী হতে পারে। এই পদক্ষেপগুলি অনুসরণ করে কৃষকরা শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় সফল হতে পারে এবং তাদের ফসলে উন্নত ফলন অর্জন করতে পারে।
                                          </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-5">
                              <p className="heading-text-center text-center">আরও পড়ুন...</p>
                              <div className="heading-border"></div>
                            </div>
                            <div className="col-md-4 my-2">
                                <div className="blog-card">
                                    <div className="blog-image">
                                        <img src="assets/img/blog/blog-1.jpg" alt="n/a" className="img-fluid"/>
                                    </div>
                                    <div className="blog-content">
                                        <div className="content-title"><a href="#0">
                                                <p className="p-0">শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় করনীয়</p>
                                            </a>
                                        </div>
                                        <div className="content-excerpt">
                                            <p >সারাদেশে শৈত্য প্রবাহ চলছে।এই প্রতিকূল আবহাওয়া থেকে বোর ধানের চারা রক্ষায় নিচের পদক্ষেপগুলো অনুসরণ করুন.</p>
                                        </div>
                                        <div className="blog-author d-flex justify-content-between">
                                            <a href="#0"> <i className="fa-solid fa-user"></i> ফাহাদ হাসান</a><a href="#0"> <i
                                                    className="fa-solid fa-calendar-days"></i> ১০ মার্চ, ২০২৪</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 my-2">
                                <div className="blog-card">
                                    <div className="blog-image">
                                        <img src="assets/img/blog/blog-1.jpg" alt="n/a" className="img-fluid"/>
                                    </div>
                                    <div className="blog-content">
                                        <div className="content-title"><a href="#0">
                                                <p className="p-0">শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় করনীয়</p>
                                            </a>
                                        </div>
                                        <div className="content-excerpt">
                                            <p >সারাদেশে শৈত্য প্রবাহ চলছে।এই প্রতিকূল আবহাওয়া থেকে বোর ধানের চারা রক্ষায় নিচের পদক্ষেপগুলো অনুসরণ করুন.</p>
                                        </div>
                                        <div className="blog-author d-flex justify-content-between">
                                            <a href="#0"> <i className="fa-solid fa-user"></i> ফাহাদ হাসান</a><a href="#0"> <i
                                                    className="fa-solid fa-calendar-days"></i> ১০ মার্চ, ২০২৪</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 my-2">
                                <div className="blog-card">
                                    <div className="blog-image">
                                        <img src="assets/img/blog/blog-1.jpg" alt="n/a" className="img-fluid"/>
                                    </div>
                                    <div className="blog-content">
                                        <div className="content-title"><a href="#0">
                                                <p className="p-0">শৈত্য প্রবাহ থেকে বোর ধানের চারা রক্ষায় করনীয়</p>
                                            </a>
                                        </div>
                                        <div className="content-excerpt">
                                            <p >সারাদেশে শৈত্য প্রবাহ চলছে।এই প্রতিকূল আবহাওয়া থেকে বোর ধানের চারা রক্ষায় নিচের পদক্ষেপগুলো অনুসরণ করুন.</p>
                                        </div>
                                        <div className="blog-author d-flex justify-content-between">
                                            <a href="#0"> <i className="fa-solid fa-user"></i> ফাহাদ হাসান</a><a href="#0"> <i
                                                    className="fa-solid fa-calendar-days"></i> ১০ মার্চ, ২০২৪</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div className="d-flex justify-content-center">
                            <a href="#0" className="theme-btn my-2">আরও পড়ুন...</a>
                       </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    {/* <!-- blog area end--> */}
    </div>
  );
}

export default Blog;