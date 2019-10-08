MBB:0105 
0x00007fafa075ecb8:   90                               nop
0x00007fafa075ecb9:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075ecbe:   3b c6                            cmp    %esi,%eax
0x00007fafa075ecc0:   0f 8c 08 00 00 00                jl     0x00007fafa075ecce
0x00007fafa075ecc6:   48 8b 04 25 0f 00 00 00          mov    0xf,%rax
0x00007fafa075ecce:   b8 ff ff ff ff                   mov    $0xffffffff,%eax
0x00007fafa075ecd3:   8b ca                            mov    %edx,%ecx
0x00007fafa075ecd5:   03 c8                            add    %eax,%ecx
0x00007fafa075ecd7:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075ecda:   3b c1                            cmp    %ecx,%eax
0x00007fafa075ecdc:   0f 8d 08 00 00 00                jge    0x00007fafa075ecea
0x00007fafa075ece2:   48 8b 04 25 0f 00 00 00          mov    0xf,%rax
MBB:0106 
0x00007fafa075ecea:   3b f2                            cmp    %edx,%esi
0x00007fafa075ecec:   0f 8d 15 00 00 00                jge    0x00007fafa075ed07
MBB:0107 
0x00007fafa075ecf2:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075ecf7:   89 44 b7 18                      mov    %eax,0x18(%rdi,%rsi,4)
0x00007fafa075ecfb:   b8 01 00 00 00                   mov    $0x1,%eax
0x00007fafa075ed00:   03 f0                            add    %eax,%esi
0x00007fafa075ed02:   e9 e3 ff ff ff                   jmpq   0x00007fafa075ecea
MBB:0108 
0x00007fafa075ed07:   c3                               retq   
