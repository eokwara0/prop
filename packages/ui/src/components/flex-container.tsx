

export function FlexContainer({children , center, iscol , className} : {children: React.ReactNode, center?: boolean , className? : string , iscol? : boolean }){
    return (
        <div className={`flex ${iscol ? 'flex-col' : ''} ${center ? 'justify-center items-center' : ''}  ${className}`}>
            {children}
        </div>
    );
}