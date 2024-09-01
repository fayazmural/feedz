import CopyButton from "@/components/copy-btn";
import React from "react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return <div>Invalid Project Id</div>;
  if (!process.env.WIDGET_URL) return <div>Missing </div>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">
        Embed the code in your site
      </p>
      <div className="bg-slate-800 p-6 rounded-md mt-6 relative">
        <code className="text-white">
          {`<my-widget project-id="${id}"></my-widget>`}
          <br />
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
        <CopyButton
          text={`<my-widget project="${id}}"></my-widget>\n<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        />
      </div>
    </div>
  );
};

export default Page;
