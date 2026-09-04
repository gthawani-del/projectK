export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({ok:false,error:'Method not allowed'});
  const {name,email,organisation,enquiry,message}=req.body||{};
  if(!name||!email||!message)return res.status(400).json({ok:false,error:'Missing required fields'});
  const apiKey=process.env.RESEND_API_KEY;
  const to=process.env.CONTACT_TO_EMAIL;
  const from=process.env.CONTACT_FROM_EMAIL||'Krida Legal Website <onboarding@resend.dev>';
  if(!apiKey||!to)return res.status(503).json({ok:false,error:'Contact service not configured'});
  const text=[`Name: ${name}`,`Email: ${email}`,`Organisation: ${organisation||'-'}`,`Enquiry: ${enquiry||'General enquiry'}`,'',message].join('\n');
  try{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:email,subject:`Krida Legal website enquiry — ${enquiry||'General'}`,text})});
    if(!r.ok){const detail=await r.text();return res.status(502).json({ok:false,error:'Delivery failed',detail});}
    return res.status(200).json({ok:true});
  }catch(err){return res.status(500).json({ok:false,error:'Unexpected error'});}
}
