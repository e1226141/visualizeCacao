MBB:0065 
0x00007fafa075ded0:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075ded3:   3b f0                            cmp    %eax,%esi
0x00007fafa075ded5:   0f 8f 05 00 00 00                jg     0x00007fafa075dee0
0x00007fafa075dedb:   e9 0a 00 00 00                   jmpq   0x00007fafa075deea
MBB:0066 
0x00007fafa075dee0:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075dee5:   e9 17 00 00 00                   jmpq   0x00007fafa075df01
MBB:0067 
0x00007fafa075deea:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075deed:   3b f0                            cmp    %eax,%esi
0x00007fafa075deef:   0f 82 08 00 00 00                jb     0x00007fafa075defd
0x00007fafa075def5:   48 8b 34 25 02 00 00 00          mov    0x2,%rsi
0x00007fafa075defd:   8b 44 b7 18                      mov    0x18(%rdi,%rsi,4),%eax
MBB:0068 
0x00007fafa075df01:   c3                               retq   
